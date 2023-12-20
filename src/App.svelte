<script lang="ts">
  import Countdown from "./lib/Countdown.svelte";
  let stopCountdown = false;
  let data: any = {
    domain: "",
    ipaddr: "",
  };
  const features = [
    {
      text: "申请子域",
      handle() {
        stopCountdown = true;
      },
    },
    {
      text: "NoneBot 文档",
      handle() {
        window.location.href = "https://nonebot.dev/";
      },
    },
  ];

  const forms = [
    {
      name: "域名",
      style: "padding-right: 3px;",
      $endname: ".none.bot",
      pattern: "^([a-z0-9-]+)$",
      placeholder: "请输入你的二级域",
      tips: "仅允许数字、小写字母与 -",
      binding: "domain",
    },
    {
      name: "IP",
      style: "margin-left: 2.05rem; margin-right: 0;",
      pattern:
        "^(?:25[0-5]|2[0-4]d|1dd|[1-9]d|d)(?:.(?:25[0-5]|2[0-4]d|1dd|[1-9]d|d)){3}$",
      placeholder: "请输入你的 IP",
      tips: "输入正确的 IPv4 地址。",
      binding: "ipaddr",
    },
  ];

  function submit(event: Event) {
    window.open(
      `mailto:support@none.bot?subject=none.bot 子域名申请&body=我已阅读并同意《使用条款》，现进行域名申请。%0d%0a%0d%0a申请项目名称: %0d%0a申请人联系方式: %0d%0a申请的子域名: ${data.domain}.none.bot%0d%0a记录解析至: ${data.ipaddr}`
    );
  }
</script>

<main>
  <div>
    <a class="logo-warpper" href="//koishi.chat">
      <img
        src="//nonebot.dev/logo.png"
        class="logo ani-logo"
        alt="NoneBot Logo"
      />
      <img src="//koishi.chat/logo.png" class="logo" alt="Koishi Logo" />
    </a>
  </div>
  <h1>None.Bot</h1>

  <div class="container">
    {#if !stopCountdown}
      <Countdown stop={stopCountdown} />
    {/if}
    <div class="cards">
      {#each features as item}
        <button on:click={item.handle}>{item.text}</button>
      {/each}
    </div>
    {#if stopCountdown}
      <form class="apply-box">
        {#each forms as item}
          <label for={item.binding}>
            {item.name}
            <input
              id={item.binding}
              type="text"
              name={item.binding}
              style={item.style}
              pattern={item.pattern}
              placeholder={item.placeholder}
              title={item.tips}
              bind:value={data[item.binding]}
              required
            />
            {item.$endname || ""}
          </label>
        {/each}
        <button on:click={submit}>申请子域</button>
      </form>
    {/if}
  </div>

  <p class="read-the-docs">
    Powered by <a href="//github.com/Lipraty">Lipraty</a> | 本项目非 NoneBot 官方项目，与
    NoneBot 官方无关。
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .read-the-docs {
    color: #888;
  }
  .cards {
    display: flex;
    justify-content: center;
    gap: 0.66rem;
  }
  .apply-box {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 2rem 1.5rem;
    border: 1px solid rgba(130, 130, 130, 0.35);
    border-radius: 16px;
  }

  .apply-box label {
    margin-bottom: 5%;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }

  .apply-box label > input[type="text"] {
    flex: 1;
    width: auto;
    border: 1px solid #aaa;
    border-radius: 8px;
    color: rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
    padding: 0.6rem;
    padding-left: 1.2rem;
    margin: 0 0.5rem;
  }

  .apply-box input::placeholder {
    color: #888;
  }

  .apply-box input:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(96, 37, 90, 0.2);
  }
</style>
