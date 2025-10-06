// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// スムーススクロール機能
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // ナビゲーションバーの高さを考慮
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ナビゲーションバーのハンバーガーメニュー
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ナビゲーションリンクのクリックイベント
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        
        // モバイルメニューを閉じる
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // スムーススクロール
        smoothScroll(target);
    });
});

// ナビゲーションバーのスクロール効果
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール方向に応じてナビゲーションバーの表示/非表示
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // ナビゲーションバーの背景透明度調整
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(44, 62, 80, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature, .menu-item, .gallery-item, .info-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// コーヒーカップのインタラクティブ効果
document.addEventListener('DOMContentLoaded', () => {
    const coffeeCup = document.querySelector('.coffee-cup');
    
    if (coffeeCup) {
        coffeeCup.addEventListener('mouseenter', () => {
            coffeeCup.style.animationPlayState = 'paused';
            coffeeCup.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        coffeeCup.addEventListener('mouseleave', () => {
            coffeeCup.style.animationPlayState = 'running';
            coffeeCup.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// メニューアイテムのホバー効果強化
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// ギャラリーアイテムのクリック効果
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // クリック時の波紋効果
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(212, 175, 55, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';
            
            item.style.position = 'relative';
            item.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// 波紋効果のCSSアニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// タイピング効果（ヒーローセクションのサブタイトル）
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // ページ読み込み後1秒後にタイピング開始
        setTimeout(typeWriter, 1000);
    }
});

// カウントアップアニメーション（価格表示）
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = '¥' + current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 価格要素のアニメーション
document.addEventListener('DOMContentLoaded', () => {
    const priceElements = document.querySelectorAll('.price');
    
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceText = entry.target.textContent;
                const price = parseInt(priceText.replace('¥', ''));
                animateValue(entry.target, 0, price, 1500);
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    priceElements.forEach(el => {
        priceObserver.observe(el);
    });
});

// フォーム送信の処理（将来の拡張用）
function handleFormSubmit(event) {
    event.preventDefault();
    // フォーム送信処理をここに追加
    console.log('フォーム送信処理');
}

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // ページ読み込みアニメーション
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // アクティブなナビゲーションリンクのハイライト
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// リサイズイベントの処理
window.addEventListener('resize', () => {
    // モバイルメニューが開いている場合、リサイズ時に閉じる
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// キーボードナビゲーション
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // ESCキーでモバイルメニューを閉じる
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// パフォーマンス最適化：スクロールイベントのスロットリング
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// スロットルされたスクロールイベント
const throttledScrollHandler = throttle(() => {
    // スクロール関連の処理
}, 16); // 60fps

window.addEventListener('scroll', throttledScrollHandler);

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// サービスワーカーの登録（PWA対応の準備）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 将来的にPWA対応を追加する場合の準備
        console.log('Service Worker support detected');
    });
}
