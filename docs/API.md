# Documentation
## API
### Example calls

#### /api/recent
View the 100 most recent messages (`amount` can be ommited):
```
curl -d '{"key":"your_key_here","amount":2}' -H 'Content-Type: application/json' http://localhost:3000/api/recent

```

#### /api/search
Do a full database search for a string and return the relevant messages (`amount` can be ommited):
```
curl -d '{"key":"your_key_here","amount":2, "str":"search_term_here"}' -H 'Content-Type: application/json' http://localhost:3000/api/search
```

#### /api/validatekey
Check if an API key can be used to fetch messages from the API:
```
curl -d '{"key":"your_key_here"}' -H 'Content-Type: application/json' http://localhost:3000/api/validatekey
```

### Related modules
- Functions to handle POST requests: `/libs/api/api.js`
- Database functions: `/libs/api/apibackend.js`
