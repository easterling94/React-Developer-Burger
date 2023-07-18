// функция позволяет плавно прокручивать содержимое блока ингредиенты до того блока, по названию которого кликнул пользователь
export const scrollToView = (id: string) => {
  const scrollTo = document.getElementById(id);
  scrollTo!.scrollIntoView({behavior: 'smooth'});
}