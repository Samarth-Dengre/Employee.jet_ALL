// Rendering requests page
module.exports.renderRequests = async (req, res) => {
    return res.render('requests/request', {
        layout: 'blank_layout',
        title: 'Requests',
        onPage: 'requests'
    });
}