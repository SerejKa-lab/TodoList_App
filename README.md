
Tasks Manager

This project was bootstrapped with create-react-app.
Used libraries and modules:

    - React -> User Interface building
    - Redux -> Bisness Logic Layer, business state managing
    - Axios -> Data Acsess Layer, server interactions
    - react-redux -> to simplify acsess to redux store using context API
    - redux-thunk -> to provide basic Redux side-effect logic, including complex synchronous logic that requires storage access, and simple asynchronous logic such as AJAX requests
    - react-router-dom -> Single Page Application approach implementation, to switch between components without reloading the html document
    - gh-pages -> project deploy on gitHub pages
    


Implemented functionality:

    -> ServerAPI:
        - all user data is stored on the remote server https://social-network.samuraijs.com/api/1.1
        - all data changes are consistent with the data on the remote server
        - server requests buttons disabling on data loading
        - data loading indicators

    -> Lists functionality:
        - list adding
        - list title inputing validation with tooltip display in case of equal titles or wrong input
        - list title renaming with input validation and tooltip display in case of equal titles or wrong input
        - list reordering
        - list deleting
        - single list display and lists general display
        - switching between lists in single list display
    
    -> Tasks functionality:
        - task adding
        - task title inputing validation with tooltip display in case of empty or more than 100 characters input
        - task updating:
            > status updating
            > priority updating
            > title updating with input validation and tooltip display in case of empty or more than 100 characters input
        -task reordering
        - task deleting

    -> Tasks paggination:
        - dinamic total pages number display
        - current page display
        - switching between pages
        - task deliting with dinamic updating of current content and total pages number
        - task reordering with moving to a new task display page

    -> Tasks status filter:
        - filtering tasks by active, completed, all
        - current filter display
        - paggination of filtered tasks
        - filtered task deliting with dinamic updating of current content and total pages number
        - task status changing with dinamic updating of current content and total pages number
        - filtered task reordering with moving to a new task display page

