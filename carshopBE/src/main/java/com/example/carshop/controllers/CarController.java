package com.example.carshop.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.carshop.domain.dto.CarDto;
import com.example.carshop.domain.dto.PaginatedResponse;
import com.example.carshop.services.CarService;

@RestController
@RequestMapping("/cars")
public class CarController {

  private final CarService carService;

  public CarController(CarService carService) {
    this.carService = carService;
  }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<CarDto> createCar(@RequestPart("car") CarDto carDto,
      @RequestPart(value = "images", required = false) List<MultipartFile> images)
      throws IOException {
    return ResponseEntity.status(HttpStatus.CREATED).body(carService.saveCar(carDto, images));
  }

  @GetMapping
  public ResponseEntity<PaginatedResponse<CarDto>> getCars(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "12") int size,
      @RequestParam(defaultValue = "") String search) {
    return ResponseEntity.ok(carService.getCarsPage(page, size, search));
  }

  @GetMapping("/manage")
  public ResponseEntity<PaginatedResponse<CarDto>> getCarsForManage(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "12") int size,
      @RequestParam(defaultValue = "") String search) {
    return ResponseEntity.ok(carService.getCarsPageForManage(page, size, search));
  }

  @GetMapping("/{id}")
  public ResponseEntity<CarDto> getCarById(@PathVariable Long id) {
    return ResponseEntity.ok(carService.getCarById(id));
  }

  @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<CarDto> updateCar(@PathVariable Long id, @RequestPart("car") CarDto carDto,
      @RequestPart(value = "newImages", required = false) List<MultipartFile> newImages,
      @RequestPart(value = "keepImageIds", required = false) String keepImageIds)
      throws IOException {
    return ResponseEntity.ok(carService.updateCar(id, carDto, newImages, keepImageIds));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    carService.deleteCar(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/latest")
  public ResponseEntity<List<CarDto>> getLatestCars() {
    return ResponseEntity.ok(carService.getLatestCars());
  }

  @GetMapping("/images/{imageId}")
  public ResponseEntity<byte[]> getImage(@PathVariable Long imageId) {
    Map.Entry<String, byte[]> image = carService.getImageData(imageId);
    return ResponseEntity.ok().contentType(MediaType.parseMediaType(image.getKey()))
        .body(image.getValue());
  }
}
