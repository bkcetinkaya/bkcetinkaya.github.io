.PHONY: run push all

all: run push

run:
	python app.py

push:
	git pull
	git add .
	git commit -m "Auto-commit changes"
	git push
