CREATE TABLE reviews (
  id serial,
  product_id int,
  rating int,
  date bigint,
  summary text,
  body text,
  recommend boolean,
  reported boolean,
  reviewer_name varchar(255),
  reviewer_email varchar(255),
  response text,
  helpfulness int,
  PRIMARY KEY (id)
);

COPY reviews FROM '/Users/loganqiu/immersive/sdc/reviews.csv' DELIMITER ',' CSV HEADER;