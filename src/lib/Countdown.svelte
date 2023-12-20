<script lang="ts">
  export let stop = false;
  let countdown = 10;
  const timer = setInterval(() => {
    if (stop && countdown > 0) clearInterval(timer);
    if (countdown > 0) {
      countdown--;
    } else if (countdown === 0) {
      if (!stop) window.location.href = "//koishi.chat";
      clearInterval(timer);
    }
  }, 1000);
</script>

<h2>将在 {countdown} 秒后转到 koishi.chat</h2>
