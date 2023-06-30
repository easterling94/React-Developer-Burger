import { LoaderAnimation } from './loader-animation'
export const Loader = () => {
  return (
    <h1 style={{textAlign: 'center', paddingTop: '30vh'}}>
      Загружаем страничку
      <LoaderAnimation />
    </h1>
  )
}