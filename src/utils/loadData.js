export default function loadData(url) {

  const data = fetch(url)
    .then(function (res) {
      if (res.status !== 200) {
        return Promise.reject(new Error(res.statusText))
      }
      return Promise.resolve(res)
    })
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      return data
    })
    .catch(function (error) {
      console.log('error', error)
    });

  return data;
}