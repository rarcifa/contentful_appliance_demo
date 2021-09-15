
const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: 'CFPAT-sVi2rICHks-1IUVyVCBjGwDz6E9YtYTOOUvtFZ9d1ic'
})

// Update entry
client.getSpace('r0u4kof55cds')
.then((space) => space.getEnvironment('master'))
.then((environment) => environment.getEntry('4z227pqdHTh5oc3BS528qT'))
.then((entry) => {
  entry.fields.catalogue['en-US'] = 'Hi'
  return entry.update()
})
.then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
.catch(console.error)

