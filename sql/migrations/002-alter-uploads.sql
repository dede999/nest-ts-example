ALTER TABLE Uploads
ADD COLUMN path VARCHAR(40) NOT NULL UNIQUE;
