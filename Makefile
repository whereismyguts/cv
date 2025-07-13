# Modern CV Website Makefile

.PHONY: help dev build clean optimize-images lint

# Default target
help:
	@echo "Available commands:"
	@echo "  dev           Start local development server"
	@echo "  build         Update projects from GitHub (optional)"
	@echo "  optimize      Optimize images for web"
	@echo "  clean         Clean temporary files"
	@echo "  lint          Check for common issues"

# Local development server (simple Python server)
dev:
	@echo "Starting local server at http://localhost:8000"
	python3 -m http.server 8000

# Update projects list from GitHub (optional)
build:
	@echo "Updating project list from GitHub..."
	python3 simple_generate.py
	@echo "Done! Website is ready to deploy"

# Optimize images for web (requires ImageMagick)
optimize-images:
	@echo "Optimizing images..."
	@if command -v convert >/dev/null 2>&1; then \
		find . -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | \
		xargs -I {} convert {} -strip -quality 85% {}; \
		echo "Images optimized"; \
	else \
		echo "Error: ImageMagick is not installed. Please install it to use this feature."; \
	fi

# Clean temporary files
clean:
	@echo "Cleaning temporary files..."
	find . -name "*.bak" -delete
	find . -name "*.tmp" -delete
	find . -name "*.log" -delete
	find . -name ".DS_Store" -delete
	@echo "Clean complete"

# Lint check (placeholder for future enhancement)
lint:
	@echo "Checking HTML syntax (requires html-validator-cli)"
	@if command -v html-validator >/dev/null 2>&1; then \
		html-validator --file index.html || echo "HTML validation issues found"; \
	else \
		echo "html-validator-cli not installed. To install: npm install -g html-validator-cli"; \
	fi

# Clean temporary files
clean:
	rm -rf __pycache__ *.pyc .DS_Store
	@echo "Cleaned up temporary files"
