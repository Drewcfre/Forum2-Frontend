<script lang="ts">
    import {currentBoard, currentDesc} from "$lib/index.js";

    import {changeFont, changeStyle, changeTheme} from "$lib/ui.config.js";
</script>

<header id="site-header" class="triangle-pattern">
    <div id="header-info">
        <h2>{currentBoard}</h2>
        <h4>{currentDesc}</h4>
    </div>

    <div id="header-dropdowns">
        <div id="header-themes" class="dropdown">
            <button class="dropdown-btn">Themes</button>
            <div class="dropdown-content">
                <a id="aa1" role="button" tabindex="0" onmousedown={changeTheme('classic')}>     Classic     </a>
                <a id="aa2" role="button" tabindex="0" onmousedown={changeTheme('light')}>       Light       </a>
                <a id="aa3" role="button" tabindex="0" onmousedown={changeTheme('low-contrast')}>Low Contrast</a>
                <a id="aa4" role="button" tabindex="0" onmousedown={changeTheme('slate')}>       Slate       </a>
                <a id="aa5" role="button" tabindex="0" onmousedown={changeTheme('garden')}>      Garden      </a>
            </div>
        </div>

        <div id="header-fonts" class="dropdown">
            <button class="dropdown-btn">Fonts</button>
            <div class="dropdown-content">
                <a id="ab1" role="button" tabindex="0" onmousedown={changeFont('Monospace')}>Monospace</a>
                <a id="ab2" role="button" tabindex="0" onmousedown={changeFont('Bristol')}>  Bristol  </a>
                <a id="ab3" role="button" tabindex="0" onmousedown={changeFont('Classica')}> Classica </a>
                <a id="ab4" role="button" tabindex="0" onmousedown={changeFont('Code128')}>  Code128  </a>
                <a id="ab5" role="button" tabindex="0" onmousedown={changeFont('Edmunds')}>  Edmunds  </a>
                <a id="ab6" role="button" tabindex="0" onmousedown={changeFont('Foo')}>      Foo      </a>
                <a id="ab7" role="button" tabindex="0" onmousedown={changeFont('Orkahaug')}> Orkahaug </a>
                <a id="ab8" role="button" tabindex="0" onmousedown={changeFont('Potra')}>    Potra    </a>
                <a id="ab9" role="button" tabindex="0" onmousedown={changeFont('QRCode')}>   QRCode   </a>
                <a id="ac1" role="button" tabindex="0" onmousedown={changeFont('Sono')}>     Sono     </a>
                <a id="ac2" role="button" tabindex="0" onmousedown={changeFont('TenPixel')}> TenPixel </a>
                <a id="ac3" role="button" tabindex="0" onmousedown={changeFont('Wave')}>     Wave     </a>
                <a id="ac4" role="button" tabindex="0" onmousedown={changeFont('Wavetosh')}> Wavetosh </a>
                <a id="ac5" role="button" tabindex="0" onmousedown={changeFont('Zector')}>   Zector   </a>
            </div>
        </div>

        <div id="header-styles" class="dropdown">
            <button class="dropdown-btn">Styles</button>
            <div class="dropdown-content">
                <a id="ad1" role="button" tabindex="0" onmousedown={changeStyle('classic')}> Classic </a>
                <a id="ad2" role="button" tabindex="0" onmousedown={changeStyle('flat')}>    Flat    </a>
                <a id="ad3" role="button" tabindex="0" onmousedown={changeStyle('gradient')}>Gradient</a>
            </div>
        </div>
    </div>
</header>