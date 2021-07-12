// You can add a list of files
function importAll(r) {
   return r.keys().map(r);
}
// importAll(require.context('./static/img', false, /\.(png|jpe?g|svg)$/));

// ... or, add files individually
import './vendors/normalize/normalize.css';
import './styles/main.scss';