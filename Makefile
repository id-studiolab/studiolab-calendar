PARCEL_ENTRY_FILE := src/index.pug
PUG_CONFIG_FILE := pug.config.js
PARCEL_OUTPUT_FILE := node_modules/.build/index.html
PRINCE_OUTPUT_FILE := out/calendar.pdf
DATA_FILE := data.js

NODE_BIN := node_modules/.bin
PARCEL_DEPENDENCIES := $(PARCEL_ENTRY_FILE) $(DATA_FILE) $(wildcard $(dir $(PARCEL_ENTRY_FILE))/*) $(PUG_CONFIG_FILE)

.PHONY: all
all: $(PRINCE_OUTPUT_FILE)


$(PRINCE_OUTPUT_FILE): $(PARCEL_OUTPUT_FILE) $(wildcard $(dir $(PARCEL_OUTPUT_FILE))/*)
	mkdir -p $(dir $@)
	prince $< --javascript -o $@
	-echo "Prince done"

$(PARCEL_OUTPUT_FILE): $(PARCEL_DEPENDENCIES) node_modules check
	mkdir -p $(dir $@)
	$(MAKE) check
	$(NODE_BIN)/parcel build --out-dir $(dir $@) --no-cache --no-content-hash --no-minify --no-source-maps --public-url './' $<


node_modules: yarn.lock package.json
	-rm -rf node_modules
	npx yarn


.PHONY: watch
watch: node_modules
	$(NODE_BIN)/chokidar $(PARCEL_DEPENDENCIES) -c "$(MAKE)" --initial

.PHONY: check
check: node_modules
	$(NODE_BIN)/tsc --noEmit --allowJs $(DATA_FILE)

.PHONY: clean
clean:
	-rm -r $(dir $(PARCEL_OUTPUT_FILE))
	-rm -r $(dir $(PRINCE_OUTPUT_FILE))
