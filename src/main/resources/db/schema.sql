CREATE USER 'admin'@'%' IDENTIFIED BY 'OERJSOPJ0IJJ66151';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';

drop table if exists public.databasechangelog;
drop table if exists public.databasechangeloglock;
drop table if exists databasechangelog;
drop table if exists databasechangeloglock;

drop schema if exists getyourway;
create schema if not exists getyourway;