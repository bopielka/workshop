package com.example.carshop.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.carshop.domain.dto.CarDto;
import com.example.carshop.domain.dto.CarImageDto;
import com.example.carshop.domain.dto.PaginatedResponse;
import com.example.carshop.domain.entity.CarEntity;
import com.example.carshop.domain.entity.CarImageEntity;
import com.example.carshop.repositories.CarImageRepository;
import com.example.carshop.repositories.CarRepository;

@Service
public class CarService {

  private final CarRepository carRepository;
  private final CarImageRepository carImageRepository;

  public CarService(CarRepository carRepository, CarImageRepository carImageRepository) {
    this.carRepository = carRepository;
    this.carImageRepository = carImageRepository;
  }

  @Transactional
  public CarDto saveCar(CarDto carDto, List<MultipartFile> images) throws IOException {
    CarEntity car = toEntity(carDto);

    if (images != null) {
      for (int i = 0; i < images.size(); i++) {
        MultipartFile file = images.get(i);
        CarImageEntity image = new CarImageEntity();
        image.setFilename(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setData(file.getBytes());
        image.setMain(i == 0);
        car.addImage(image);
      }
    }

    ensureMainImage(car.getImages());

    return toDto(carRepository.save(car));
  }

  @Transactional(readOnly = true)
  public PaginatedResponse<CarDto> getCarsPage(int page, int size, String search) {
    var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    var result = (search == null || search.isBlank())
        ? carRepository.findAllByIsDraftFalse(pageable)
        : carRepository.searchPublished(search, pageable);
    return PaginatedResponse.from(result.map(this::toDto));
  }

  @Transactional(readOnly = true)
  public PaginatedResponse<CarDto> getCarsPageForManage(int page, int size, String search) {
    var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
    var result = (search == null || search.isBlank()) ? carRepository.findAll(pageable)
        : carRepository.searchAll(search, pageable);
    return PaginatedResponse.from(result.map(this::toDto));
  }

  @Transactional(readOnly = true)
  public CarDto getCarById(Long id) {
    return carRepository.findById(id).map(this::toDto)
        .orElseThrow(() -> new NoSuchElementException("Car not found: " + id));
  }

  @Transactional
  public CarDto updateCar(Long id, CarDto carDto, List<MultipartFile> newImages,
      String keepImageIdsParam) throws IOException {
    List<Long> keepIds = new ArrayList<>();
    if (keepImageIdsParam != null && !keepImageIdsParam.isBlank()) {
      for (String s : keepImageIdsParam.split(",")) {
        keepIds.add(Long.parseLong(s.trim()));
      }
    }
    Set<Long> keepIdsSet = new HashSet<>(keepIds);

    // Phase 1: update isMain via direct SQL before loading the image collection,
    // so Hibernate sees the correct state when it lazy-loads images below.
    carImageRepository.clearMainForCar(id);
    if (!keepIds.isEmpty()) {
      carImageRepository.setAsMain(keepIds.get(0));
    }

    // Phase 2: entity operations (Hibernate will lazy-load images fresh from DB,
    // picking up the isMain values set above — no dirty-check conflict).
    CarEntity car = carRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Car not found: " + id));

    car.setModel(carDto.getModel());
    car.setMake(carDto.getMake());
    car.setYearOfProduction(carDto.getYearOfProduction());
    car.setMileage(carDto.getMileage());
    car.setFuelType(carDto.getFuelType());
    car.setPower(carDto.getPower());
    car.setCapacity(carDto.getCapacity());
    car.setDoorCount(carDto.getDoorCount());
    car.setGearboxType(carDto.getGearboxType());
    car.setBodyType(carDto.getBodyType());
    car.setDescription(carDto.getDescription());
    car.setPrice(carDto.getPrice());
    car.setDraft(carDto.isDraft());

    car.getImages().removeIf(img -> !keepIdsSet.contains(img.getId()));

    boolean hasKeptMain = !keepIds.isEmpty();
    if (newImages != null) {
      for (int i = 0; i < newImages.size(); i++) {
        MultipartFile file = newImages.get(i);
        CarImageEntity image = new CarImageEntity();
        image.setFilename(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setData(file.getBytes());
        image.setMain(!hasKeptMain && i == 0);
        car.addImage(image);
      }
    }

    return toDto(carRepository.save(car));
  }

  @Transactional
  public void deleteCar(Long id) {
    if (!carRepository.existsById(id)) {
      throw new NoSuchElementException("Car not found: " + id);
    }
    carRepository.deleteById(id);
  }

  @Transactional(readOnly = true)
  public List<CarDto> getLatestCars() {
    return carRepository.findTop12ByIsDraftFalseOrderByPriceDesc().stream().map(this::toDto)
        .toList();
  }

  @Transactional(readOnly = true)
  public Map.Entry<String, byte[]> getImageData(Long imageId) {
    CarImageEntity image = carImageRepository.findById(imageId)
        .orElseThrow(() -> new NoSuchElementException("Image not found: " + imageId));
    return Map.entry(image.getContentType(), image.getData());
  }

  private void ensureMainImage(List<CarImageEntity> images) {
    if (images.isEmpty())
      return;
    boolean hasMain = images.stream().anyMatch(CarImageEntity::isMain);
    if (!hasMain) {
      images.get(0).setMain(true);
    }
  }

  private CarEntity toEntity(CarDto dto) {
    CarEntity car = new CarEntity();
    car.setModel(dto.getModel());
    car.setMake(dto.getMake());
    car.setYearOfProduction(dto.getYearOfProduction());
    car.setMileage(dto.getMileage());
    car.setFuelType(dto.getFuelType());
    car.setPower(dto.getPower());
    car.setCapacity(dto.getCapacity());
    car.setDoorCount(dto.getDoorCount());
    car.setGearboxType(dto.getGearboxType());
    car.setBodyType(dto.getBodyType());
    car.setDescription(dto.getDescription());
    car.setPrice(dto.getPrice());
    car.setDraft(dto.isDraft());
    return car;
  }

  private CarDto toDto(CarEntity car) {
    CarDto dto = new CarDto();
    dto.setId(car.getId());
    dto.setModel(car.getModel());
    dto.setMake(car.getMake());
    dto.setYearOfProduction(car.getYearOfProduction());
    dto.setMileage(car.getMileage());
    dto.setFuelType(car.getFuelType());
    dto.setPower(car.getPower());
    dto.setCapacity(car.getCapacity());
    dto.setDoorCount(car.getDoorCount());
    dto.setGearboxType(car.getGearboxType());
    dto.setBodyType(car.getBodyType());
    dto.setDescription(car.getDescription());
    dto.setPrice(car.getPrice());
    dto.setDraft(car.isDraft());
    dto.setImages(car.getImages().stream().map(this::toImageDto).toList());
    return dto;
  }

  private CarImageDto toImageDto(CarImageEntity image) {
    CarImageDto dto = new CarImageDto();
    dto.setId(image.getId());
    dto.setFilename(image.getFilename());
    dto.setContentType(image.getContentType());
    dto.setSize(image.getSize());
    dto.setMain(image.isMain());
    return dto;
  }
}
