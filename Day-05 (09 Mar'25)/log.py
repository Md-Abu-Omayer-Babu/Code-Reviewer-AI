import logging

# Configure logging
logging.basicConfig(
    filename="error.log",  # Log file
    level=logging.ERROR,  # Log level
    format="%(asctime)s - %(levelname)s - %(message)s",
)

try:
    x = 1 / 0  # This will cause a ZeroDivisionError
except Exception as e:
    logging.error("An error occurred: %s", str(e))
