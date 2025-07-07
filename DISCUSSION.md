# High level concerns & discussion

There are some things I wanted to point out, but which I didn't want to adress, as it probably isn't a productive use of my time for this exercise, so I wanted to list those concerns here:

* Eslint isn't upgraded to v9, there are some nice benefits there with configuration and more. If we didn't want to go to v9, we should update the package version to adress vulnerabilities, and ensure we're on a supported version.
* Packages are out of date, and there are critical security vulnerabilities. I updated with `npm audit fix`, but there are remaining vulnerabilities available with force fixes. I want to note this should be fixed, but I don't think it's a good use of my time for this exercise.

# If given more time:

* Setup postgress DB and make API calls
* Input should be inside a form, and submitted onSubmit, not in an onChange hnandler for performance, and to reduce the number of API calls.
    * Modify inputs to have a search and a clear button
    * Also submit on "enter"

# Some blue-sky nice to haves:
* Include "autocomplete" in search input for available specialties, cities, and degrees. There is a much smaller size of data, so this data could be client-side to power this, so autocomplete can function without API requests. The API request would happen when the item is selected / submitted.This would likely require moving to a component library such as [Zag's combobox](https://zagjs.com/components/react/combobox)
* Search should be scoped to the DB based on the type of data in the input. i.e. If it's one of the valid auto-complete values, a string, or a number. This would speed up API requests.

**Note:** Normally I would not like to put PRs on top of each other, but this PR is on top of the dependency update PR just to ensure I have up to date dependencies and I'm not running into any weird bugs as I work.
