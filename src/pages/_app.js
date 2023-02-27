import { fetchAllRooms } from "@/store/slices/allRoomsSlice";
import { Provider, useDispatch } from "react-redux";
import { wrapper } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     try {
//       await store.dispatch(fetchAllRooms());
//       return { props: {} };
//     } catch (e) {
//       return { props: {} };
//     }
//   }
// );
export default MyApp;
