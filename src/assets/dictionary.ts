import { Injectable } from "@angular/core";

@Injectable()
export class Dictionary{
    dictionary = [
        /*0*/['БИАЖ ӨЗІНДІК ҚҰН', 'ЕИИС СЕБЕСТОИМОСТЬ', 'UIIS PRIME COST '],
        /*1*/['ЖҮК ТАСЫМАЛЫ', 'ГРУЗОВЫЕ ПЕРЕВОЗКИ', 'FREIGHT TRANSPORTATION'],
        /*2*/['МАГИСТРАЛЬДЫҚ ТЕМІРЖОЛ ЖЕЛІСІ', 'МАГИСТРАЛЬНАЯ Ж/Д СЕТЬ', 'MAIN RAILWAY NETWORK'],
        /*3*/['Деректерді жүктеу', 'Загрузка данных', 'Data download'],
        /*4*/['ҚТЖ ақпараттық жүйелерінен деректерді жинау', 'Загрузка данных из информационных систем КТЖ', 'Loading data from KTZ information systems'],
        /*5*/['Шығын мөлшерлемелерін есептеу', 'Расчет расходных ставок', 'Calculation of expenditure rates'],
        /*6*/['Өзіндік құнды есептеу', 'Расчет себестоимости', 'Calculation of cost'],
        /*7*/['Талдау', 'Анализ', 'Analysis'],
        /*8*/['Жөнелтімдер өзіндік құнын есептеу', 'Расчет себестоимости отправок', 'Calculation of the cost of shipments'],
        /*9*/['Жөнелтімдерді талдау', 'Анализ отправок', 'Analysis of shipments'],
        /*10*/['Шығу', 'Выход', 'Exit'],
        /*11*/['2017 © "Экономика, көлік және телекоммуникацияларды ақпараттандыру ғылыми-зерттеу институты" ЖШС', '2017 © ТОО "Научно-исследовательский институт экономики и информатизации транспорта, телекоммуникаций"', '2017 © LLP "Research Institute of Economics and Informatization of Transport, Telecommunications"'],
        /*12*/['Кешіріңіз, компонент жасалуда', 'Извините, компонент в разработке', 'Sorry, the component is under construction'],
        /*13*/['Пайдалану көрсеткіштері', 'Эксплуатационные показатели', 'Performance indicators'],
        /*14*/['Шығын өлшеуіштері бойынша шығындар', 'Расходы по расходным измерителям', 'Expenses for consumables'],
        /*15*/['Шығын мөлшерлемелері', 'Расходные ставки', 'Consumption rates'],
        /*16*/['Орташа өзіндік құнды есептеу', 'Расчет средней себестоимости', 'Calculation of average cost price'],
        /*17*/['Нақты өзіндік құнды есептеу', 'Расчет конкретной себестоимости', 'Calculation of the specific cost price'],
        /*18*/['Тәуелді шығын мөлшерлемелері', 'Зависящие расходные ставки', 'Dependent spending rates'],
        /*19*/['Шартты тұрақты расходные ставки', 'Условно-постоянные расходные ставки','Conditionally constant spending rates'],
        /*20*/['Толық шығын мөлшерлемелері', 'Полные расходные ставки', 'Full spending rates'],
        /*21*/['Шығын өлшеуіштері бойынша тәуелді шығындар', 'Зависящие расходы по расходным измерителям', 'Dependent expenses for consumption meters'],
        /*22*/['Шығын өлшеуіштері бойынша шартты тұрақты  шығындар', 'Условно-постоянные расходы по расходным измерителям', 'Conditional-fixed costs for consumables'],
        /*23*/['Шығын өлшеуіштері бойынша толық шығындар', 'Полные расходы по расходным измерителям', 'Total costs for consumables'],
        /*24*/['ЖАЛПЫ ПАРАМЕТРЛЕР', 'ОБЩИЕ ПАРАМЕТРЫ', 'COMMON PARAMETERS'],
        /*25*/['МАРШРУТТЫ ТАҢДАУ', 'ВЫБОР МАРШРУТА', 'CHOOSING THE ROUTE'],
        /*26*/['ПАРАМЕТРЛЕРДІ ТАҢДАУ', 'ВЫБОР ПАРАМЕТРОВ', 'CHOOSING OF PARAMETERS'],
        /*27*/['ЕСЕПТЕУ НӘТИЖЕЛЕРІ', 'РЕЗУЛЬТАТЫ РАСЧЕТА', 'CALCULATION RESULTS'],
        /*28*/['Қызмет жеткізушісі', 'Поставщик услуг', 'Service Provider'],
        /*29*/['Қызмет', 'Услуга', 'Service'],
        /*30*/['Өзіндік құн түрі', 'Вид Себестоимости', 'Type of Cost'],
        /*31*/['Жүк тасымалдаудың өзіндің құны түрі', 'Тип себестоимости перевозки груза', 'Type of cost of transportation of cargo'],
        /*32*/['Есептеу әдісі', 'Метод расчета', 'Calculation method'],
        /*33*/['Қалыптасу жоспарын ескеру', 'Учитывать план формирования', 'Take into account the formation plan'],
        /*34*/['Қолданылатын шығын мөлшерлемелері', 'Использовать расходные ставки', 'Use spending rates'],
        /*35*/['Жоқ мәндерді есептеу', 'Вычислять отсутствующие значения', 'Calculate missing values'],
        /*36*/['Күні', 'Дата', 'Date'],
        /*37*/['Кезең түрі', 'Тип периода', 'Period type'],
        /*38*/['Жүк түрі', 'Род груза', 'Type of cargo'],
        /*39*/['Жүк сипаттамасы', 'Характеристика груза', 'Characteristics of cargo'],
        /*40*/['Хабарлама түрі', 'Вид сообщения', 'Type of message'],
        /*41*/['Жүк жөнелтімінің түрі', 'Вид грузовой отправки', 'Type of cargo shipment'],
        /*42*/['Жүк вагонының типі', 'Тип грузового вагона', 'Type of railway carriage'],
        /*43*/['Вагон меншігі', 'Принадлежность вагона', 'Belonging of railway carriage'],
        /*44*/['Контейнер түрі', 'Тип контейнера', 'Container type'],
        /*45*/['Түгендемелік вагондар меншігі', 'Принадлежность инвентарного вагона', 'Belonging of an inventory railway carriage'],
        /*46*/['Контейнер меншігі', 'Принадлежность контейнера', 'Belonging of container'],
        /*47*/['Жүк күзетіледі', 'Производится охрана груза', 'The cargo is protected'],
        /*48*/['Жүк салмағы', 'Вес груза', 'Cargo weight'],
        /*49*/['Жөнелтімдегі вагондар саны', 'Количество вагонов в отправке', 'Number of wagons in shipment'],
        /*50*/['Контейнерлер саны', 'Количество контейнеров', 'Number of containers'],
        /*51*/['Күте тұрыңыз. Есептелуде...', 'Подождите. Идёт расчет...', 'Please, wait. Calculating ...'],
        /*52*/['Әдістеме', 'Методика', 'Methodology'],
        /*53*/['Қызмет', 'Услуга', 'Service'],
        /*54*/['Кезең', 'Период', 'Period'],
        /*55*/['Поезд учаскесі', 'Поездоучасток', 'Train district'],
        /*56*/['Операциялар деңгейі', 'Уровень операций', 'Level of operations'],
        /*57*/['Өлшеуіштер деңгейі', 'Уровень измерителей', 'Level of meters'],
        /*58*/['Параметрлерді жаңарту', 'Сбросить параметры', 'Reset options'],
        /*59*/['Атауы', 'Наименование', 'Name'],
        /*60*/['Болдырмау', 'Отменить', 'Undo'],
        /*61*/['Excell-ге шығары', 'Выгрузить в Excell', 'Download to Excell'],
        /*62*/['Өзіндік құн түрі', 'Вид себестоимости', 'Type of cost'],
        /*63*/['Поезд учаскесі', 'Поездоучасток', 'Train zone'],
        /*64*/['Өзіндік құннның өлшем бірлігі', 'Единица измерения себестоимости', 'Unit of measure of cost price'],
        /*65*/['Кезең', 'Период', 'Period'],
        /*66*/['Операциялар деңгейі', 'Уровень операций', 'Level of operations'],
        /*67*/['ЕСЕПТЕУ НӘТИЖЕЛЕРІ', 'РЕЗУЛЬТАТЫ РАСЧЁТА', 'RESULTS OF CALCULATION'],
        /*68*/['Шығындар', 'Расходы', 'Costs'],
        /*69*/['Тәуелді шығын мөлшерлемелері', 'Зависящие расходные ставки', 'Dependent spending rates'],
        /*70*/['Шартты тұрақты расходные ставки', 'Условно-постоянные расходные ставки','Conditionally constant spending rates'],
        /*71*/['Толық шығын мөлшерлемелері', 'Полные расходные ставки', 'Full spending rates'],
        /*72*/['Шығын өлшеуіштері бойынша тәуелді шығындар', 'Зависящие расходы по расходным измерителям', 'Dependent expenses for consumption meters'],
        /*73*/['Шығын өлшеуіштері бойынша шартты тұрақты  шығындар', 'Условно-постоянные расходы по расходным измерителям', 'Conditional-fixed costs for consumables'],
        /*74*/['Шығын өлшеуіштері бойынша толық шығындар', 'Полные расходы по расходным измерителям', 'Total costs for consumables'],
        /*75*/['Қаржылық деректерді жүктеу', 'Загрузка финансовых данных', 'Loading financial data'],
        /*76*/['"ЕК ИОДВ" жүйесінен деректерді жүктеу', 'Загрузка данных из ЕК ИОДВ', 'Loading data from "ЕК ИОДВ"'],
        /*77*/['"АСУ ДКР" жүйесінен деректерді жүктеу', 'Загрузка данных из АСУ ДКР', 'Loading data from "АСУ ДКР"'],
        /*78*/['"Ц Расчет" жүйесінен деректерді жүктеу', 'Загрузка данных из Ц Расчет', 'Loading data from "Ц Расчет"'],
        /*79*/['Статистикалық көрсеткіштерді жүктеу', 'Загрузка статистических показателей', 'Downloading statistical indicators'],
        /*80*/['Статус', 'Статус', 'Status'],
        /*81*/['Үлгіні қарау', 'Просмотр шаблона', 'View template'],
        /*82*/['Жүктеу', 'Загрузить', 'Download'],
        /*83*/['Жаңарту', 'Обновить', 'Update'],
        /*84*/['Құжат түрі', 'Вид документа', 'Document type'],
        /*85*/['Жөнелтілу станциясы', 'Станция отправления', 'Departure station'],
        /*86*/['Жөнелтім түрі', 'Вид отправки', 'Type of shipment'],
        /*87*/['Жеткізілу станциясы', 'Станция назначения', 'Destination station'],
        /*88*/['Вагон типі', 'Тип вагона', 'Type of railway carriage'],
        /*89*/['Атауын жасыру', 'Скрыть наименование', 'Hide title'],
        /*90*/['Атауын көрсету', 'Показать наименование', 'Show title'],
        /*91*/['Күте тұрыңыз. Деректер жүктелуде...', 'Подождите. Идет загрузка данных...', 'Please, wait. Loading data ...'],
        /*92*/['Қолданушы профилі', 'Профиль пользователя', 'User account'],
        /*93*/['Тегі', 'Фамилия', 'Surname'],
        /*94*/['Аты', 'Имя', 'Name'],
        /*95*/['Әкесінің аты', 'Отчество', 'Name of the father'],
        /*96*/['Құпиясөзді өзгерту', 'Сменить пароль', 'Change password'],
        /*97*/['Ескі құпиясөз', 'Старый пароль', 'Old password'],
        /*98*/['Жаңа құпиясөз', 'Новый пароль', 'New password'],
        /*99*/['Құпиясөзді қайталаңыз', 'Повторите пароль', 'Confirm password'],
        /*100*/['Ескі құпиясөз', 'Старый пароль', 'Old password'],
        /*101*/['Өзгерістерді сақтау', 'Сохранить изменения', 'Save сhanges'],
        /*102*/['Бөлімдер мәзірі', 'Меню разделов', 'Partition menu'],
        /*103*/['Жәрдем формасы', 'Форма помощи', 'Form of assistance'],
        /*104*/['Есептеу әдістемелері', 'Методики расчета', 'Calculation methods'],
        /*105*/['Анықтамалықтар', 'Справочники', 'Directories'],
        /*106*/['Қолданушы нұсқалығы', 'Руководство пользователя', 'User guide'],
        /*107*/['Жиі қойылатын сұрақтар', 'Часто задаваемые вопросы', 'Frequently asked questions'],
        /*108*/['Қазақша', 'Русский', 'English'],
        /*109*/['Жәрдем', 'Помощь', 'Help'],
        /*110*/['Жүйеге кіру', 'Вход в систему', 'Login to the system'],
        /*111*/['Қолданушы', 'Пользователь', 'User'],
        /*112*/['Логин', 'Логин', 'Login'],
        /*113*/['Құпиясөз', 'Пароль', 'Password'],
        /*114*/['Құпиясөзді ұмыттыңыз ба?', 'Забыли пароль?', 'Forgot your password?'],
        /*115*/['Кәсіпорын', 'Предприятие', 'Company'],
        /*116*/['Кіру', 'Вход', 'Login'],
        /*117*/['Құпиясөзді жаңарту үшін қолданушы тіркелген пошта адресін көрсетіңіз:', 'Для восстановления пароля укажите почту на каторую зарегистрирован пользователь:', 'To recover the password, specify the mail to the registered user:'],
        /*118*/['Адрес:', 'Адрес:', 'Address:'],
        /*119*/['Арай 53, Сол жағалау, Астана қ.', 'Арай 53, Левый берег, г. Астана', 'Арай 53, Left Coast, Astana'],
        /*120*/['Телефон:', 'Телефон:', 'Phone:'],
        /*121*/['Шығындарды тарату', 'Отнесение расходов', 'Assignment of expenses'],
        /*122*/['Өзіндік құнды талдау', 'Анализ себестоимости', 'Cost analysis'],
        /*123*/['Шығындарды талдау', 'Анализ расходов', 'Expenses analysis'],
        /*124*/['Өлшем бірлігі:', 'Единица измерения:', 'Unit of measurement:'],
        /*125*/['Пайызбен көрсету', 'Показать в процентах', 'Show percentage'],
        /*126*/['Кеңейтілген фильтрлерді жасыру', 'Скрыть расширенные фильтры', 'Hide advanced filters'],
        /*127*/['Кеңейтілген фильтрлерді көрсету', 'Показать расширенные фильтры', 'Show advanced filters'],
        /*128*/['Фильтрлерді жасыру', 'Скрыть фильтры', 'Hide filters'],
        /*129*/['Фильтрлерді көрсету', 'Показать фильтры', 'Show filters'],
        /*130*/['Есептеу', 'Рассчитать', 'Calculate'],
        /*131*/['Барлық жол бойынша есептеу үшін өрісті бос қалдырыңыз', 'Для расчёта по всей дороге оставить поле пустым', 'To calculate the entire road leave the field blank'],
        /*132*/['Баланстық қатынастарды шығару', 'Вывести балансовые соотношения', 'Derive the balance ratios'],
        /*133*/['Барлық комбинациялар бойынша есептеу', 'Рассчитать по всем комбинациям', 'Calculate for all combinations'],
        /*134*/['Есептеу', 'Рассчитать', 'Calculate'],
        /*135*/['Есептеу нәтижесі', 'Результат расчета', 'Result of calculation'],
        /*136*/['теңге/10 тонно-км', 'тенге/10 тонно-км', 'tenge/10 ton-km'],
        /*137*/['Бастапқы деректер', 'Исходные данные', 'Initial data'],
        /*138*/['Парольді қайта құру', 'Восстановление пароля', 'Password recovery'],
        /*139*/['Қосымша параметрлер', 'Дополнительные параметры', 'Extra options'],
        /*140*/['Сұрақты іздеу', 'Найти вопрос', 'Find the question'],
        /*141*/['Іздеу', 'Найти', 'Find'],
        /*142*/['Іздеуді тазарту', 'Очистить поиск', 'Clear search'],
        /*143*/['Сұрақтар', 'Вопросы', 'Questions'],
        /*144*/['Сұрақ', 'Вопрос', 'Question'],
        /*145*/['Жауаптар', 'Ответы', 'Answers'],
        /*146*/['Табылған жоқ', 'Не найдено', 'Not found'],
        /*147*/['Фильтр', 'Фильтр', 'Filter'],
        /*148*/['Фильтрлеу', 'Отфильтровать', 'Filter'],
        /*149*/['Қателер туралы ақпарат жинау формасы', 'Форма сбора данных об ошибках', 'Error collection form'],
        /*150*/['Қате мәтінін енгізіңіз', 'Введите текст ошибки', 'Enter error text'],
        /*151*/['Жөнелту', 'Отправить', 'Send'],
        /*152*/['Назар аударыңыз', 'Внимание', 'Attention'],
        /*153*/['Сіздің хабарламаңыз жіберілді.', 'Ваше обращение направлено.', 'Your appeal has been sent.'],
        /*154*/['Сіз қате мәтінін толтырмадыңыз', 'Вы не заполнили текст ошибки', 'You did not fill in the error text'],
        /*155*/['Электрондық пошта', 'Электронная почта', 'e-mail'],
        /*156*/['Бағдарлама баптаулары', 'Настройки программы', 'Program settings'],
        /*157*/['Батырмалар мәтінін көрсету', 'Отображать текст кнопок', 'Display button text'],
        /*158*/['Қолданушы деректері', 'Данные пользователя', 'User data'],
        /*159*/['Маршрут ұзақтығы (км)', 'Длина маршрута (км)', 'Length of the route (км)'],
        /*160*/['Қазақстан картасы', 'Карта Казахстана', 'Map of Kazakhstan'],
        /*161*/['Логин және Құпиясөз толтырылмаған...', 'Не заполнены Логин или Пароль...', 'Not filled in Login or Password ...'],
        /*162*/['Қолданушы', 'Пользователь', 'User'],
        /*163*/['Қолданушы логині немесе құпиясөзі дұрыс емес', 'Логин пользователя или пароль неправильные', 'User login or password is incorrect'],
        /*164*/['Қосымшадан шыққыңыз келеді ме?', 'Хотите выйти из приложения?', 'Would you like to exit the application??'],
        /*165*/['Иә', 'Да', 'Yes'],
        /*166*/['Болдырмау', 'Отмена', 'Cancel'],
        /*167*/['Бағдарлама интейфейсінің тілі', 'Язык интерфейса программы', 'Language of the program interface'],
        /*168*/['Бастаулар сақталынды', 'Настройки сохранены', 'Settings have been saved'],
        /*169*/['Сессия уақыты аяқталды', 'Время сессии истекло', 'Session timeout'],
        /*170*/['Сервер қателігі', 'Ошибка сервера', 'Server error'],
        /*171*/['Құпиясөздер сәйкес келмейді, жаңа құпиясөзді және қайтадан енгізілген құпиясөзді тексеруіңізді сұраймыз', 'Пароли не совпадают, пожалуйста проверьте новый пароль и повторно введённый пароль', 'Passwords do not match, please check the new password and re-entered password'],
        /*172*/['Жаңа және ескі құпиясөздер бірдей болмауы тиіс', 'Новый и старый пароли не должны совпадать', 'New and old passwords must not be the same'],
        /*173*/['Құпиясөзде бос орын болмауы тиіс', 'Пароль не должен содержать пробелы', 'Password can not contain spaces'],
        /*174*/['Ескі құпиясөз дұрыс емес', 'Старый пароль не верный', 'Old password is not correct'],
        /*175*/['Сіз деректерді толтырмадыңыз', 'Вы не заполнили данные', 'You have not filled out the data'],
        /*176*/['', '', ''],
        /*177*/['', '', ''],
        /*178*/['', '', ''],
        /*179*/['', '', ''],
        /*180*/['', '', '']
    ]
}