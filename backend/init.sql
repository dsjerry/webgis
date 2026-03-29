-- Docker PostGIS initialization script
-- Auto-executed on first container start

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS pgrouting;

-- Features table
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    geom GEOMETRY(Point, 4326) NOT NULL,
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Parcels table
CREATE TABLE IF NOT EXISTS parcels (
    id SERIAL PRIMARY KEY,
    address VARCHAR(300),
    area_sqm FLOAT,
    geom GEOMETRY(Polygon, 4326) NOT NULL
);

-- Roads table (for pgRouting)
CREATE TABLE IF NOT EXISTS roads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    source INT,
    target INT,
    cost FLOAT DEFAULT 1,
    reverse_cost FLOAT DEFAULT 1,
    geom GEOMETRY(LineString, 4326) NOT NULL
);

-- Spatial indexes
CREATE INDEX IF NOT EXISTS features_geom_idx ON features USING GIST (geom);
CREATE INDEX IF NOT EXISTS parcels_geom_idx ON parcels USING GIST (geom);
CREATE INDEX IF NOT EXISTS roads_geom_idx ON roads USING GIST (geom);

-- Sample data: Beijing landmarks
INSERT INTO features (name, category, geom) VALUES
    ('Forbidden City', ST_GeomFromText('POINT(116.3970 39.9165)', 4326)),
    ('Tiananmen Square', ST_GeomFromText('POINT(116.3975 39.9043)', 4326)),
    ('Temple of Heaven', ST_GeomFromText('POINT(116.4106 39.8828)', 4326)),
    ('Great Wall', ST_GeomFromText('POINT(116.5704 40.4319)', 4326)),
    ('Bird''s Nest', ST_GeomFromText('POINT(116.4056 39.9928)', 4326)),
    ('Summer Palace', ST_GeomFromText('POINT(116.2765 39.9993)', 4326));

DO $$
BEGIN
    RAISE NOTICE 'WebGIS PostGIS database initialized!';
    RAISE NOTICE 'PostGIS version: %', PostGIS_Version();
END $$;
