# Fiachna's Steam Analyser

A simple little steam library analyser tool, viewable at https://radiant-island-55758-a2340f5c85f8.herokuapp.com/

## Running locally

You can either use docker-compose or just run the ui and server separately, for docker, simply run the following:

```docker-compose up```

inside the base directory and it will spin up a node server and serve the react files at localhost:3000/

To run the apps separately, first ensure you run 

```npm install```

in both the root directory and the ui directory (as the ui directory has a separate react app), then in each of the same
directories, run

```npm run dev```

This will start a react server at localhost:5173 and a node service at localhost:3000

## Notes

 - There are no tests on the frontend code, though there should be at least around the context construct... I was
 running out of time and so kind of tried to rush it out the door
 - This is the second or third version of this app I've built, the first were nestjs + react but they were a bit too
 ambitious in their creative features, so for the sake of time I switched over to a quick and dirty node, express, react
 app
 - My original idea for a creative feature had been to determine playtime by tags and present a graph combining this
 data so that the user could identify the tags they were most likely to purchase, vs the tags they were most likely to
 play. Unfortunately steam does not expose tag information via the API
 - My next idea was a kind of 6-degrees-of-separation kind of thing, where you could view a network graph of friends
 and friends of friends with different colours depending on how many games/playtime you had in common, but the requests
 for this were pretty hefty so I was starting to go down the queue and server sent events path, at which point I had to
 pull myself up as it was getting a bit too big for a quick code test
 - Finally, this iteration simply shows the number of years spent playing games, I was personally quite shocked when I
 saw that I myself had spent nearly 1.5 years of my life playing videogames