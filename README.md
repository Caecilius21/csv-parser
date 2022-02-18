# run server
python manage.py runserver

# rebundle frontend
cd frontend
npm run dev

# run tests
python manage.py test
coverage run --source='.' manage.py test
# generate test report
coverage html
coverage report