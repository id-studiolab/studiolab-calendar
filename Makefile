SRC_FOLDER := src
TEMPLATE_FILE := $(SRC_FOLDER)/template/index.pug
TEMPLATE_FOLDER := $(dir $(TEMPLATE_FILE))
OUTPUT_FILE := out/calendar.pdf
DATA_FILE := config-data.js
PDF_GENERATOR_SCRIPT := $(SRC_FOLDER)/generate-pdf.js

NODE_BIN := node_modules/.bin
ENTRY_FILE_DEPENDENCIES := $(wildcard $(SRC_FOLDER)/**/*) $(DATA_FILE)


.PHONY: all
all: $(OUTPUT_FILE)


$(OUTPUT_FILE): $(ENTRY_FILE_DEPENDENCIES)
	$(MAKE) check
	mkdir -p $(dir $@)
	node $(PDF_GENERATOR_SCRIPT) $(TEMPLATE_FOLDER) $(TEMPLATE_FILE) $(DATA_FILE) $(OUTPUT_FILE)

node_modules: package-lock.json package.json
	-rm -rf node_modules
	npm install


.PHONY: watch
watch: node_modules
	$(NODE_BIN)/chokidar $(ENTRY_FILE_DEPENDENCIES) -c "$(MAKE)" --initial

.PHONY: check
check: node_modules
	$(NODE_BIN)/tsc --noEmit --allowJs $(DATA_FILE)

.PHONY: clean
clean:
	-rm -r $(dir $(OUTPUT_FILE))
