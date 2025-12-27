#!/bin/bash
# build_files.sh
# Install dependencies
pip install -r requirements.txt

# Create the static folder and move files there
python3.12 manage.py collectstatic --noinput --clear