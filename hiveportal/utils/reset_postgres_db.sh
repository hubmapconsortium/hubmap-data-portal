#!/bin/sh
sudo -u postgres psql <<EOF
drop database hiveportal;
create database hiveportal;
alter database hiveportal owner to hiveportal_login;
EOF
