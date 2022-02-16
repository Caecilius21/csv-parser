# run tests
coverage run --source='.' manage.py test
# generate test report
coverage html
coverage report