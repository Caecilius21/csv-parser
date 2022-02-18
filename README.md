# run tests
python manage.py test
coverage run --source='.' manage.py test
# generate test report
coverage html
coverage report