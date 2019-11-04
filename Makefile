ENTRY_FILE := src/index.pug
ENTRY_CONFIG_FILE := pug.config.js
HTML_OUTPUT_FILE := node_modules/.build/index.html
PDF_OUTPUT_FILE := out/calendar.pdf
DATA_FILE := data.js

NODE_BIN := node_modules/.bin
ENTRY_FILE_DEPENDENCIES := $(ENTRY_FILE) $(DATA_FILE) $(wildcard $(dir $(ENTRY_FILE))/*) $(ENTRY_CONFIG_FILE)

.PHONY: all
all: $(PDF_OUTPUT_FILE)


$(PDF_OUTPUT_FILE): $(HTML_OUTPUT_FILE) $(wildcard $(dir $(HTML_OUTPUT_FILE))/*)
	mkdir -p $(dir $@)
	prince $< --javascript -o $@
	-echo "Prince done"

$(HTML_OUTPUT_FILE): $(ENTRY_FILE_DEPENDENCIES) node_modules check
	mkdir -p $(dir $@)
	$(MAKE) check
	$(NODE_BIN)/parcel build --out-dir $(dir $@) --no-cache --no-content-hash --no-minify --no-source-maps --public-url './' $<


node_modules: yarn.lock package.json
	-rm -rf node_modules
	npx yarn


.PHONY: watch
watch: node_modules
	$(NODE_BIN)/chokidar $(ENTRY_FILE_DEPENDENCIES) -c "$(MAKE)" --initial

.PHONY: check
check: node_modules
	$(NODE_BIN)/tsc --noEmit --allowJs $(DATA_FILE)

.PHONY: clean
clean:
	-rm -r $(dir $(HTML_OUTPUT_FILE))
	-rm -r $(dir $(PDF_OUTPUT_FILE))
