CREATE TABLE IF NOT EXISTS car (
  id                 BIGSERIAL PRIMARY KEY,
  model              TEXT,
  make               TEXT,
  year_of_production DATE
);

CREATE TABLE IF NOT EXISTS car_image (
  id           bigserial PRIMARY KEY,
  car_id       BIGINT    NOT NULL REFERENCES car (id) ON DELETE CASCADE,
  filename     TEXT      NOT NULL,
  content_type TEXT      NOT NULL CHECK (content_type IN ('image/png', 'image/jpeg')),
  size         BIGINT    NOT NULL CHECK (size > 0),
  position     INT       NOT NULL DEFAULT 0,
  data         bytea     NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_car_image_car ON car_image(car_id);
