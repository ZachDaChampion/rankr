# rankr
Rank things accurately with a comparison-based approach.

# Docker

This project can be built and run using Docker. To build the image, run the following command from the root of the project:

```bash
docker build . -t rankr
```

When running the container, be sure to map port 80 to a port on the host machine. You must also
set the `THEMOVIEDB_TOKEN` and `VUE_APP_DOMAIN` environment variables. The former is an API key
for The Movie Database, and the latter is the domain name of the host machine.
