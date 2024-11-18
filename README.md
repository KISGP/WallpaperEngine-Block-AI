# WallpaperEngine-Block-AI

在浏览 [WallpaperEngine](https://store.steampowered.com/app/431960/Wallpaper_Engine/) 应用程序中浏览创意工坊时，总会出现那么几个 AI 作品 😓，关键是有一些 AI 作品的作者发布的作品不仅质量低而且作品量又多 💩。因此通过添加用户屏蔽列表来隐藏 ​​ 这些低质量的 AI 作品。

> 如果你想知道某个用户发布的创意工坊内容，把下面连接的用户替换成 JSON 文件中用户的 value 字段即可。
>
> 创意工坊链接格式: https://steamcommunity.com/profiles/用户/myworkshopfiles/
>
> eg: https://steamcommunity.com/profiles/76561197972790955/myworkshopfiles/

> [!warning]
>
> - 由于在写代码时已经我的屏蔽的用户很多了，筛选起来过于麻烦，因此会导致屏蔽的作品除了 AI 外，还屏蔽了一些热舞、短视频之类的（只占了小部分，大部分还是屏蔽 AI）。
> - 屏蔽情况未考虑 R-18🔞 分区的作品。
> - 由于有些人发布的作品不全是 AI，还有些人的 AI 作品质量挺高，因此不考虑屏蔽这些。

> [!tip]
>
> 代码会增量更新你的 WallpaperEngine 配置文件，不会删除已经修改原有的配置文件的内容。
>
> 代码运行时会保留一份原先的配置文件并命名为 `config_backup.json`，位置在 wallpaper_engine 的安装目录下。因此若是发现屏蔽效果不如意可以使用原先的配置文件，把`config_backup.json`改回`config.json`即可。

> [!important]
>
> - 运行代码或修改配置文件前需先关闭 WallpaperEngine 应用程序，如未关闭则会导致修改失败。

# 如何使用

1. 确保电脑具备 [node](https://nodejs.org/zh-cn) 环境

2. 拉取仓库或者下载仓库

3. 安装依赖

   ```
   npm i
   ```

4. 运行

   - **屏蔽 AI**

     ```
     node .\Block.js AI
     ```

   - 屏蔽 Gay 和福瑞（筛选的时候这两者高度重合，而且也很多 AI 作品）

     ```
     node .\Block.js GayAndFurry
     ```

   - 屏蔽一些热舞视频

     ```
     node .\Block.js HotDance
     ```

   - 屏蔽以上全部内容

     ```
     node .\Block.js
     ```

# 屏蔽情况举例

![image-20241117154426041](./assets/image-20241117154426041.png)

![image-20241117154434657](./assets/image-20241117154434657.png)
