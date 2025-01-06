import Footer from "./react/layout/Footer";
import Header from "./react/layout/Header";
import Main from "./react/layout/Main";
import Search from "./react/component/Search";
import useAppLogic from "./react/hooks/useAppLogic";
import StatusWrapperHeader from "./react/component/StatusWrapperHeader";
import StatusWrapperMain from "./react/component/StatusWrapperMain";

function App() {
  const {
    data,
    error,
    isLoading,
    debouncedOnSearchChange,
    debouncedOnKeyDownSearch,
    debouncedReFetchData,
  } = useAppLogic();

  const content = (
    <>
      <Header>
        <Search
          onSearchChange={debouncedOnSearchChange}
          onKeyDownSearch={debouncedOnKeyDownSearch}
          isLoading={isLoading}
        />
        <section className="header__info">
          <StatusWrapperHeader
            isLoading={isLoading}
            error={error}
            debouncedReFetchData={debouncedReFetchData}
            data={data}
          />
        </section>
      </Header>
      <Main>
        <StatusWrapperMain isLoading={isLoading} error={error} data={data} />
      </Main>
      <Footer />
    </>
  );
  return content;
}

export default App;
