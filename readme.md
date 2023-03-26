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

## Programmatic Navigation

```jsx
const navigate = useNavigate();
```
