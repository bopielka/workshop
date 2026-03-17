CREATE TABLE IF NOT EXISTS car (
  id                   BIGSERIAL PRIMARY KEY,
  model                TEXT,
  make                 TEXT,
  year_of_production   INT,
  mileage              INT,
  fuel_type            TEXT,
  power                INT,
  capacity             INT,
  door_count           INT,
  gearbox_type         TEXT,
  body_type            TEXT,
  description          TEXT,
  price                NUMERIC(12, 2)
);

CREATE TABLE IF NOT EXISTS car_image (
  id           BIGSERIAL PRIMARY KEY,
  car_id       BIGINT    NOT NULL REFERENCES car (id) ON DELETE CASCADE,
  filename     TEXT      NOT NULL,
  content_type TEXT      NOT NULL CHECK (content_type IN ('image/png', 'image/jpeg')),
  size         BIGINT    NOT NULL CHECK (size > 0),
  is_main      BOOLEAN   NOT NULL DEFAULT FALSE,
  data         bytea     NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_car_image_car ON car_image(car_id);
