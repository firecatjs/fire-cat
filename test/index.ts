import 'ts-jest'
const baseUrl = 'http://127.0.0.1:3010'
import * as qs from 'qs'
import axios from 'axios'

async function getData(api: string, data: any = {}) {
  const result = await axios(baseUrl + api + '?' + qs.stringify(data), {
    method: 'get',
  })
  return result.data
}

describe("api test",   () => {

  it('home.index', async () => {
    const result = await getData('/')
    expect(result).toBe('hello world')
  })

  it('home.find', async () => {
    const result = await getData('/find')
    expect(result).toBe('find world')
  })

  it('home.about', async () => {
    const result = await getData('/about')
    expect(result).toBe('about page')
  })

  it('test.news', async () => {
    const result = await getData('/test/news')
    expect(result).toBe('news list')
  })

  it('test.show', async () => {
    const result = await getData('/test/show')
    expect(result).toBe('The \'name\' field is required.')
  })

  it('test.show.name', async () => {
    const result = await getData('/test/show', {name: '长安'})
    expect(result).toBe('your name is 长安')
  })

  it('test.hello.world', async () => {
    const result = await getData('/test/hello')
    expect(result).toBe('world')
  })


})