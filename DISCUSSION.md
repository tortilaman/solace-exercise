# High level concerns & discussion

There are some things I wanted to point out, but which I didn't want to adress, as it probably isn't a productive use of my time for this exercise, so I wanted to list those concerns here:

* Eslint isn't upgraded to v9, there are some nice benefits there with configuration and more. If we didn't want to go to v9, we should update the package version to adress vulnerabilities, and ensure we're on a supported version.
* Packages are out of date, and there are critical security vulnerabilities. I updated with `npm audit fix`, but there are remaining vulnerabilities available with force fixes. I want to note this should be fixed, but I don't think it's a good use of my time for this exercise.
