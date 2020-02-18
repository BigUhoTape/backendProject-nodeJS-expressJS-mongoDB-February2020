const keys = require('../keys');

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Восстановление доступа',
        html: `
            <h1>Вы забыли пароль?</h1>
            <p>Если нет, то проигнорируйте данное сообщение.</p>
            <p>Иначе, нажмите на ссылку</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстановить доступ</a></p>
            <hr/>
            <p>Наш магазин - <a href="${keys.BASE_URL}">Courses shop</a></p>
        `
    }
};