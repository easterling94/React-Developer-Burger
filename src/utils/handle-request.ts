// функция позволяет показывать минимальное время экрана загрузки принудительно увеличивая время на величину MS
export const handleRequest = (request: any, ms: number) => {
  setTimeout(() => {
    request();
  }, ms);
}