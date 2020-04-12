module.exports = app => {
  const cheerio = require('cheerio')
  const axios = require('axios')

  app.get('/states', async (req, res) => {
    var url = 'https://www.mohfw.gov.in'

    let content = await useAxios(url)

    const $ = cheerio.load(content, false, null)

    let response = []

    $('.table-responsive')
      .find('tr')
      .each((index, element) => {
        var name = 0
        var confirmed = 0
        var cured = 0
        var death = 0
        $(element)
          .find('td')
          .each((index, element) => {
            if (index == 1) {
              name = $(element).text()
            }
            if (index == 2) {
              confirmed = $(element).text()
            }
            if (index == 3) {
              cured = $(element).text()
            }
            if (index == 4) {
              death = $(element).text()
              response.push({
                state: name,
                confirmed: confirmed,
                cured: cured,
                death: death
              })
            }
          })
      })

    return res.status(200).json(response)
  })

  async function useAxios (url) {
    checkResposne = await axios.get(url)
    return checkResposne.data
  }
}
