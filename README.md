# Chrome Keyboard Shortcuts

## Design Decisions
Why are content scripts classes instead of modules? so that I can inherit behavior from a common class

Why use a "main" file? so that the class I make for each page only includes code necessary for that page (ie. all boilerplate/common code is abstracted away into “main”) (The disadvantage of this method is that I need to store data in a global from the class page (so that main can access it))



## How to add keyboard shortcuts for a specific webpage/site


## How to add a general keyboard shortcut