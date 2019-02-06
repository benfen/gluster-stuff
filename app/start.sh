#!/bin/sh

export READ_DIR=/mnt/glusterfs
export UPLOAD_DIR=/mnt/glusterfs

BASEDIR=$(dirname $0)
node "${BASEDIR}/bin/www"
