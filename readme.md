# React Router

## Create a Router

At the top level, in the main.jsx or index.js file add a `<BrowserRouter>` or `<HashRouter>` wrapped around your `<App/>`.

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

## Routes and Route

In the most basic version of routing we would add a `<Routes>` object with `<Route>` objects nested inside it, in your `App.jsx` file.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/other" element={<Other />} />
  <Route path="*" element={<Dunno />} />
</Routes>
```

The `path` attribute in each `<Route>` is what matches against the url in the browser location bar.

The `element` attribute in each `<Route>` is the React Component that loads when the Route path matches.

## Link and NavLink

To navigate between Routes we can use either a `<Link>` or `<NavLink>`.

```jsx
<Link to="/page">Page</Link>
<NavLink to="/page">Page</NavLink>
```

The primary difference between the two, is that the `NavLink` will add a CSS class `active` to the anchor element if the current URL matches the `to` attribute value.

By default, all the `to` attribute values will be relative to the current location as defined by the `Routes`.

If you want to link to an external url, you can use an `<a href="">` element tag. Alternatively, you can use the `<Link>` component and pass an object to the `to` attribute.

```jsx
<Link to={{pathname: 'https://www.example.com/'}} target="_self">
<Link to={{pathname: 'https://www.example.com/'}} target="_blank">
```

You can also add a `target` attribute to load the URL in the current tab or a new one.

## Nested Navigation and Components

Using the Routes in the example above, we could add more routes inside of any of those components - `<Home>`, `<Other>`, and `<Dunno>` could also have a `<Routes>` with nested `<Route>` elements.

```jsx
export default function Other() {
  return (
    <main>
      <p>The content for the Other component.</p>

      <Routes>
        <Route path="inner" element={<Inner />} />
        <Route path="thing" element={<Thing />} />
      </Routes>
    </main>
  );
}
```

With the Other component above loading from the route `/other`. We can add additional route portions to the URL with these nested routes.

`/other/inner` will load the `<Inner>` component.

`/other/thing` will load the `<Thing>` component.

However, if you change the URL to either `/other/inner` or `/other/thing` then it no longer matches the top level route path `/other`. To fix this we need to update the top level route by adding `/*`
on the end.

```jsx
<Route path="/other/*" element={<Other />} />
```

## Outlet and OutletContext

Another way to nest content is by nesting the Routes in the top level `<Routes>` element.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/other/*" element={<Other />}>
    <Route path="inner" element={<Inner />} />
    <Route path="thing" element={<Thing />} />
  </Route>
  <Route path="*" element={<Dunno />} />
</Routes>
```

Then, inside of the `<Other>` component, we place an `<Outlet />` component. The Outlet is the location where the content from `<Inner>` or `<Thing>` will be loaded if the route matches.

```jsx
export default function Other() {
  return (
    <main>
      <p>The content for the Other component.</p>

      <Outlet />
    </main>
  );
}
```

There is also a hook that you can use with outlets to pass along state data. Add a `context` attribute to the `<Outlet>` component where you can pass through your state data to any component that is
loaded into the Outlet.

```jsx
export default function Other() {
  const [info, setInfo] = useState({ id: 123, name: 'bob' });

  return (
    <main>
      <p>The content for the Other component.</p>

      <Outlet context={[info, setInfo]} />
    </main>
  );
}
```

Once the component is loaded into the Outlet, if you want to access the data from the `context` attribute then you can use the `useOutletContext` hook.

```jsx
export default function Inner() {
  const [info, setInfo] = useOutletContext();

  return (
    <div className="inner">
      <p>{info}</p>
    </div>
  );
}
```

## Route Params

If you want a route that can handle changing values, we can use the `useParams` hook.

Take this route as an example. The `/users/` part is hard-coded to match the url. The `:id` part is a variable. It will handle ANY value. So, we could have `/users/123` and `/users/456` and
`/users/add` all as possible matches for this route.

```jsx
<Route path="/users/:id" element={<Users />} />
```

You can have a url that has multiple variables - `/thing/:action/static/:id/:type`. - `action`, `id`, and `type` are all variables.

Then, inside the `<Users/>` component, when we need to know what the parameter value is, we use the `useParams` hook to get the values. This works just like `props`. We can destructure the params
object that will be returned from the hook.

```jsx
export default function Users() {
  const { id } = useParams();

  return (
    <div>
      <p>Details for user {id}.</p>
    </div>
  );
}
```

## Programmatic Navigation

The vast majority of times you will be using either a `<Link>` or a `<NavLink>` component for your links and routing.

However, there will be occassions when you need a user to click on something and then do a few other things before changing the route url. To achieve this, we can use the `useNavigate` hook to
programmatically navigate between routes.

```jsx
const navigate = useNavigate();

function doSomething() {
  //upload some data to the server api
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      //data is the response from the api
      navigate('/success');
    })
    .catch((err) => {
      navigate('/failed');
    });
}
```

## QueryString Values

If you are passing data through the QueryString you can use the `useSearchParams()` hook to read or set the values in the querystring.

```jsx
let [searchParams, setSearchParams] = useSearchParams();
```

The `searchParams` variable is an Object containing key value pairs from the current QueryString.

The `setSearchParams()` variable is a method that you can call to update/replace the QueryString with new values. Calling it will update the current URL in the browser location bar. Doing this is like
calling the `navigate()` method created by the `useNavigate()` hook.
