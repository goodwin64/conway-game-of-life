# conway-game-of-life
My own Conway's Game of Life implementation

Impl. #2: basic
- square gamepad
- fixed size (both gamepad and cells)
- simple "game" process: pre-rendered field just to check logic
- unit-tests cover not all cases

# Installation
The `npm` should be installed on your PC preliminarily.

```
# in the folder you want to store the app (e.g. Documents)
git clone XXX           # <--- clones the app from Github (paste repo URL instead of "XXX")
                        # for now the repo URL is "https://github.com/goodwin64/conway-game-of-life.git"

cd conway-game-of-life  # <--- move to the app directory from the parent

npm install             # <--- install all necessary dependencies (without them app won't work)

npm test                # <--- run tests and watch coverage (how the app is tested) [optional]

webpack                 # <--- compile the app from source files

npm start               # <--- run server to watch the result
                        # all is done, just visit [localhost](http://localhost:8080/)
```
