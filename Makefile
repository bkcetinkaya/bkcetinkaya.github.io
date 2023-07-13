.PHONY: run push all

all: run push

run:
	python app.py

push:
	git add .
	git commit -m "Auto-commit changes"
	git push
