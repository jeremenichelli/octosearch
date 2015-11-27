# Labs theme

Base template for (jeremenichelli.github.io/labs)[jeremenichelli.github.io/labs].

## Set up

Change the values in **_config.yml** to match labs information. Special attention given to the `baseurl` that will make the site to work online.

## Serve locally

While developing run the server with no base url:

```bash
jekyll serve --baseurl ""
```

## Build

Every time a modification in the scripts or styles is made run this command:

```bash
gulp && jekyll build
```