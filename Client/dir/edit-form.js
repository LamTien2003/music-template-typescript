import EditForm from './components/edit-form';
const currentHref = new URL(window.location.href);
const searchParams = new URLSearchParams(currentHref.search);
const idSong = searchParams.get('id');
const Form = new EditForm(idSong);
