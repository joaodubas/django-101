# Django 101

## Instalando

### O ambiente:

#### `virtualenv` &amp; `virtualenvwrapper`

```bash
$ sudo pip install virtualenv virtualenvwrapper
$ export WORKON_HOME=$HOME/.venv  # onde ficam os seus ambientes virtuais
$ export PROJECT_HOME=$HOME/public  # onde ficam os projetos
$ source /usr/local/bin/virtualenvwrapper.sh  # inicializa vari&aacute;veis de ambiente
```

### O Django

```bash
$ mkproject meu-projeto  # cria pasta em $PROJECT_HOME e $WORKON_HOME
$ pip install django
$ django-admin.py --version
1.5.x
```

Caso voc&ecirc; j&aacute; tenha um ambiente virtual e um projeto, &eacute; poss&iacute;vel ligar os dois usando `setvirtualenvproject`.

```bash
$ setvirtualenvproject $WORKON_HOME/&lt;ambiente&gt; $PROJECT_HOME/&lt;projeto&gt;
```

#### Criando o projeto

```bash
$ django-admin.py startprojetct &lt;nome-do-projeto&gt;
```

![](/static/img/pres_django_proj_structure.png)

#### Servindo o projeto

```bash
$ python manage.py runserver
Validating models...

0 errors found
August 27, 2013 - 19:14:54
Django version 1.5.2, using settings 'a_fazer.settings'
Development server is running at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
[27/Aug/2013 19:15:03] "GET / HTTP/1.1" 200 1958
```

![](/static/img/pres_django_server.png)

#### Criando uma aplica&ccedil;&atilde;o

```bash
$ python manage.py startapp &lt;nome-da-app&gt;
```

![](/static/img/pres_django_app_structure.png)

Em geral tamb&eacute;m adiciono os arquivos `forms.py`, `urls.py`, `admin.py`

## Como funciona

![](/static/img/pres_django_req_resp_01.png)

**Fonte:** [Karen Rustad](http://littlegreenriver.com/weblog/2013/03/23/django-for-designers/)

### URLs

```python
from django.conf.urls import patterns, url
from .views import HSListView, HSCreateView, HSDetailView, HSEditView, HSRemoveView

urlpatterns = patterns('',
    url(r'^create/$', HSCreateView.as_view(), name='create_hotsite'),
    url(r'^detail/(?P&lt;slug&gt;[\w\-]+)/$', HSDetailView.as_view(), name='detail_hotsite'),
    url(r'^edit/(?P&lt;slug&gt;[\w\-]+)/$', HSEditView.as_view(), name='edit_hotsite'),
    url(r'^remove/(?P&lt;slug&gt;[\w\-]+)/$', HSRemoveView.as_view(), name='delete_hotsite'),
    url(r'^$', HSListView.as_view(), name='list_hotsite'),
)
```

### Views

```python
from django.core.urlresolvers import reverse_lazy
from django.views.generic import ListView
from braces.views import LoginRequiredMixin
from utils.views import SearchMixin

class HotsiteListView(LoginRequiredMixin, SearchMixin, ListView):
    login_url = reverse_lazy('auth:login')
    model = Hotsite
    queryset_filter = ('page_title__icontains', )

    def get_context_data(self, **kwargs):
        context = super(HotsiteListView, self).get_context_data(**kwargs)
        if self.get_queryterm_value():
            context['queryterm'] = self.get_queryterm_value()
        return context
          `</pre>
        </section>
        <section>
```

### Observa&ccedil;&atilde;o

```python
    from bottle import Bottle, request, jinja2_template as template
    from .db import plugin
    from .models import Hotsite

    @app.get('/hotsite')
    def list_hotsite(db):
        tmpl = 'core/hotsite_list.html'
        hotsites = db.query(Hotsite).all()
        if not request.query.get('q'):
            return template(tmpl, {'hotsite_list': hotsites})
        q = request.query.get('q')
        hotsites = db.query(Hotsite).filter(Hotsite.title.like('%{0}%'.format(q)))
        return template(tmpl, {'hotsite_list': hotsites, 'queryterm': q})
```

Acho bottle e flask mais elegantes nesse ponto.

### Models

```python
class Hotsite(ToDictMixin):
    slug = models.SlugField(max_length=128, unique=True)
    url = models.CharField(max_length=64)
    start_at = models.DateField(verbose_name=_(u'data de in&iacute;cio'))
    end_at = models.DateField(blank=True, null=True, verbose_name=_(u'data de sa&iacute;da'))
    partner = models.IntegerField(null=True, blank=True, verbose_name=_(u'parceiro'))
    page_title = models.CharField(max_length=128, verbose_name=_(u't&iacute;tulo'))
    meta_description = models.CharField(max_length=128, verbose_name=_(u'descri&ccedil;&atilde;o'))
    meta_canonical_url = models.URLField(verbose_name=_(u'URL can&ocirc;nica'))
    meta_keywords = models.CharField(max_length=128, verbose_name=_(u'keywords'))

    def __unicode__(self):
        return u'Hotsite: {0}'.format(self.page_title)

    @models.permalink
    def get_absolute_url(self):
        return ('hotsite:detail_hotsite', (), { 'slug': self.slug })
```

### Forms

```python
from django.conf import settings
from django import forms

class HotsiteForm(forms.ModelForm):
    class Meta:
        model = Hotsite

    class Media:
        tmpl = '{0}{{0}}'.format(settings.STATIC_URL)
        css = { 'all': (tmpl.format('css/datepicker.css'), ) }
        js = (
            tmpl.format('js/date-time/bootstrap-datepicker.min.js'),
            tmpl.format('js/date-time/locales/bootstrap-datepicker.pt-BR.js'),
            tmpl.format('js/app-date-picker.js')
        )
```

### Templates

    {% extends "base_app.html" %}
    {% block title %}Hotsite{% endblock title %}
    {% block content %}
      &#133;
      {% for item in hotsite_list %}
        <tr>
          <td>[{{ item.page_title }}]({{ item.get_absolute_url }})</td>
          <td>{{ item.get_category_display }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.created_at }}</td>
        </tr>
      {% endfor %}
      &#133;
    {% endblock content %}

## Baterias incluidas

### Admin

![](/static/img/pres_django_admin.png)

### Autentica&ccedil;&atilde;o/Autoriza&ccedil;&atilde;o

![](/static/img/pres_django_autenticacao.png)

![](/static/img/pres_django_autorizacao.png)

## Turbinando

### South

![](/static/img/pres_south.jpg)

[Docs](http://south.readthedocs.org/en/latest/)

### django-debug-toolbar

![](/static/img/pres_debug_toolbar.png)

[Repo](https://github.com/django-debug-toolbar/django-debug-toolbar)

### django-braces

[Docs](http://django-braces.readthedocs.org/en/latest/index.html)

### django-statsd

[Docs](http://django-statsd.readthedocs.org/en/latest/index.html)

[Repo](https://github.com/andymckay/django-statsd)

### IPython

```python
    IPython 1.0.0 -- An enhanced Interactive Python.
    ?         -&gt; Introduction and overview of IPython's features.
    %quickref -&gt; Quick reference.
    help      -&gt; Python's own help system.
    object?   -&gt; Details about 'object', use 'object??' for extra details.

    In [1]: from django.contrib.
    django.contrib.admin         django.contrib.localflavor
    django.contrib.admindocs     django.contrib.markup
    django.contrib.auth          django.contrib.messages
    &#133;
```

[Site](http://ipython.org/)

## Aprenda mais

* [Docs Python](http://docs.python.org/2.7/)
* [Docs Django](https://docs.djangoproject.com/en/1.5/)
* [Django Class-Based Views](http://http://ccbv.co.uk/)
* [Mutir&atilde;o Python](https://www.facebook.com/pycursos)
  [Compilado](http://goo.gl/E4j8cV)
* [PyVideo](http://pyvideo.org/)

[
  ![](/static/img/pres_tsd.png)
](https://django.2scoops.org/)
