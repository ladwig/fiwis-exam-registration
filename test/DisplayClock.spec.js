import { render } from '@testing-library/vue'
import DisplayClock from '@/components/DisplayClock.vue'

test('shows current time', async () => {

  const { findByText } = render(DisplayClock)
  const date = new Date()
  const time = ('0'+date.getHours()).substr(-2) + ":" + ('0'+date.getMinutes()).substr(-2)

  await findByText(time, {exact: false})

})
