import { LoaderAnimation } from './loader-animation'
export const Loader = () => (
  <h1 style={{textAlign: 'center', paddingTop: '30vh'}}>
    Загружаем данные с сервера
    <LoaderAnimation />
  </h1>
)