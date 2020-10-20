# DARE Node.js code assessment

We have been asked to develop an application that manages some information regarding insurance policies and company clients. To do that, there are two services that provide all the data needed:
- The list of company clients can be found at: http://www.mocky.io/v2/5808862710000087232b75ac
- The list of company policies can be found at: http://www.mocky.io/v2/580891a4100000e8242b75c5

With this information, we need to create a API REST (very important to be a real API REST) that exposes the following services with their inherent restrictions:
- Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"
- Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
- Get the list of policies linked to a user id -> Can be accessed by users with role "admin" and by the own user
- add any REST API endpoint you consider valuable

## Mandatory

- Authentication and authorization. The authentication model must be based on https://tools.ietf.org/html/rfc6750
- Include tests (at least 1 unit test, 1 integration test and one end to end tests)
- ES6 (var is not ES6)
- Use github or any source control tool. It would be great if we can see incremental steps
- Use Latest Node.js LTS version
- This API is a middleware, so is very important how to propagate the request to the data source API and how to manage the error handling and the asynchronism. DON'T USE A DB.
- Configuration of a linter and some specific rules to maintain code coherence style.

## Additional details

As our stakeholders can be very fuzzy sometimes, here are some tips of what are we looking for:
- Solution properly structured
- Usage of patterns: If you use some design pattern, explain the reasons
- Add everything you think it is needed to ensure the product's quality & proper maintenance in case of an error.
- We expect to have a minimum documentation on a README file. We need to know what have you done and how to run your app. Also, if you have taken any decision or could not meet any of requirements, please explain it to us. Any documentation to help others to use the API REST is very valuable.

## Recommendations

- Use the framework you feel more comfortable using (express.js, fastify...)
